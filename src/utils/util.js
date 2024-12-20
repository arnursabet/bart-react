/**
 * Utility functions for date and time handling
 */

/**
 * Formats the current time in 12-hour format
 * @returns {string} Formatted time string (e.g., "3:30 PM")
 */
export function formatCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  /**
   * Generates time options in 15-minute intervals for the next 24 hours
   * @returns {Array<string>} Array of formatted time strings
   */
  export function generateTimeOptions() {
    const times = [];
    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
    
    for (let i = 0; i < 96; i++) { // 24 hours * 4 (15-min intervals)
      const time = new Date(now);
      time.setMinutes(time.getMinutes() + (i * 15));
      
      const timeString = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      times.push(timeString);
    }
    return times;
  }

  /**
   * Formats a date object for API requests
   * @param {Date} date - Date object to format
   * @returns {string} Formatted date string (MM/DD/YYYY)
   */
  export function formatDateForApi(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  /**
   * Generates date options for the next 7 days
   * @returns {Array<Object>} Array of date objects with display and value properties
   */
  export function generateDateOptions() {
    const dates = [];
    const now = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      
      dates.push({
        display: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        value: formatDateForApi(date)
      });
    }
    return dates;
  }