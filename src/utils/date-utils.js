import moment from "moment";
import "moment-timezone";

const DubaiTimezone = "Asia/Dubai";

export const formatDate = (date, dateFormat) => {
  return moment(date).format(dateFormat);
};
export const formatUTCDate = (date, dateFormat) => {
  return moment(date).utc().format(dateFormat);
};

export const convertToTimezone = (date, timezone = DubaiTimezone) => {
  return moment(date).tz(timezone).toDate();
};

export const formatDateWithTimeZone = (
  date,
  timezone = DubaiTimezone,
  dateFormat = DateFormats.NormalFromat
) => {
  return moment(date).tz(timezone).format(dateFormat);
};

export const tryFormatDate = (date, dateFormat = DateFormats.NormalFromat) => {
  try {
    return formatDate(date, dateFormat);
  } catch (e) {
    return date;
  }
};

export const tryFormatDateWithTimezone = (
  date,
  timezone = DubaiTimezone,
  dateFormat = DateFormats.NormalFromat
) => {
  try {
    return formatDateWithTimeZone(date, timezone, dateFormat);
  } catch (e) {
    return date;
  }
};

export class DateFormats {
  static NormalFromat = "DD-MM-YYYY h:mm A";
  static MonthNameFormat = "DD-MMM-YYYY";
  static MonthNameOnly = "MMM";
  static TimeOnlyFormat = "h:mm A";
}

export const addDays = (date, days) => {
  return moment(date).add(days, "days").toDate();
};

export const getUTCStartOfDate = (date) => {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
};
