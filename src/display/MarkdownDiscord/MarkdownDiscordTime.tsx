import { CSSProperties, default as React, FunctionComponent } from 'react';
import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';

type TimestampFormat = 'd' | 'f' | 't' | 'D' | 'F' | 'R' | 'T';

/*
 * Gets a timestamp format for a provided timestamp.
 *
 * Example:
 *   <t:123456789:d>   	Month/Day/Year
 *   <t:123456789:f>   	Month Day, Year Time
 *   <t:123456789:t>   	Time
 *   <t:123456789:D>   	Month Day, Year
 *   <t:123456789:F>   	Weekday, Month Day, Year Time
 *   <t:123456789:R>   	Time since
 *   <t:123456789:T>   	Hours:Minutes:Seconds
 */
const getTimestampFormat = ({
  timestamp,
  format: timestampFormat,
}: {
  timestamp: number;
  format: TimestampFormat;
}) => {
  const time = new Date(timestamp);
  switch (timestampFormat) {
    case 'd':
      return format(time, 'MM/dd/yyyy');
    case 'f':
      return format(time, 'LLLL d, yyyy h:mm aa');
    case 't':
      return format(time, 'h:mm aa');
    case 'D':
      return format(time, 'LLLL d, yyyy');
    case 'F':
      return format(time, 'EEEE, LLLL d, yyyy h:mm aa');
    case 'R': {
      const formattedDistance = formatDistance(time, new Date(), {
        addSuffix: true,
      }).replace(/(about|almost) /, '');
      if (formattedDistance.length <= 1) return formattedDistance;
      return (
        formattedDistance[0].toUpperCase() + formattedDistance.substring(1)
      );
    }
    case 'T':
      return format(time, 'h:mm:ss aa');
    default:
      throw new Error(`No format protocol for '${format}' exists.`);
  }
};

/*
 * Displays a timestamp format for a provided timestamp.
 *
 * @param timestamp - Number of milliseconds elapsed since the epoch.
 *
 * Example:
 *   <t:123456789000:d>   	Month/Day/Year
 *   <t:123456789000:f>   	Month Day, Year Time
 *   <t:123456789000:t>   	Time
 *   <t:123456789000:D>   	Month Day, Year
 *   <t:123456789000:F>   	Weekday, Month Day, Year Time
 *   <t:123456789000:R>   	Time since
 *   <t:123456789000:T>   	Hours:Minutes:Seconds
 */
export const MarkdownDiscordTime: FunctionComponent<{
  className?: string;
  style?: CSSProperties;
  timestamp: number;
  format: TimestampFormat;
}> = ({ className, style, timestamp, format }) => {
  const formatted = getTimestampFormat({ timestamp, format });

  return (
    <div className={className} style={style}>
      {formatted}
    </div>
  );
};
