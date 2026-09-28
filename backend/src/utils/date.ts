export interface IPartialDate {
	year?: number | undefined;
	month?: number | undefined;
	day?: number | undefined;
	hour?: number | undefined;
	minute?: number | undefined;
	second?: number | undefined;
	timestamp: Date;
}

export function buildPartialDate(input?: {
	year?: number | undefined;
	month?: number | undefined;
	day?: number | undefined;
	hour?: number | undefined;
	minute?: number | undefined;
	second?: number | undefined;
	timestamp?: Date | string | undefined;
}): IPartialDate {
	const now = input?.timestamp ? new Date(input.timestamp) : new Date();

	const year = input?.year !== undefined ? input.year : now.getFullYear();
	const month = input?.month !== undefined ? input.month : undefined;
	const day = input?.day !== undefined ? input.day : undefined;
	const hour = input?.hour !== undefined ? input.hour : undefined;
	const minute = input?.minute !== undefined ? input.minute : undefined;
	const second = input?.second !== undefined ? input.second : undefined;

	// Compute ISO timestamp for database sorting
	const computedDate = new Date(
		year,
		month !== undefined ? month - 1 : 0,
		day !== undefined ? day : 1,
		hour !== undefined ? hour : 0,
		minute !== undefined ? minute : 0,
		second !== undefined ? second : 0
	);

	return {
		year,
		month,
		day,
		hour,
		minute,
		second,
		timestamp: computedDate
	};
}

export function formatPartialDate(pd?: IPartialDate | null, locale = "en"): string {
	if (!pd) return "";

	const { year, month, day, hour, minute } = pd;

	if (!year) {
		return pd.timestamp ? new Date(pd.timestamp).toLocaleDateString(locale) : "";
	}

	if (month === undefined) {
		return `${year}`;
	}

	// Use standard Intl.DateTimeFormat for locale-aware month formatting without hardcoded translation arrays
	const monthName = new Intl.DateTimeFormat(locale, { month: "long" }).format(
		new Date(2000, month - 1, 1)
	);

	if (day === undefined) {
		return `${monthName} ${year}`;
	}

	const dateStr = `${day}. ${monthName} ${year}`;

	if (hour === undefined) {
		return dateStr;
	}

	const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
	const formattedHour = pad(hour);

	if (minute === undefined) {
		return `${dateStr}, ${formattedHour}:00`;
	}

	return `${dateStr}, ${formattedHour}:${pad(minute)}`;
}
