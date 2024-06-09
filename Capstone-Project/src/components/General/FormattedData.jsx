import { format } from 'date-fns';

 export const FormattedDate = ({ dateString }) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "MMMM d, yyyy 'at' h:mm a");

  return (
    <span className="formatted-date">{formattedDate}</span>
  );
};