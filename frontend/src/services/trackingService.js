import api from './api';

const TRACKING_API_URL = '/api/tracking';

class TrackingService {
  // Attendance
  getAllAttendance() {
    return api.get(`${TRACKING_API_URL}/attendance`);
  }

  recordAttendance(attendanceData) {
    return api.post(`${TRACKING_API_URL}/attendance`, attendanceData);
  }

  // Completions
  getAllCompletions() {
    return api.get(`${TRACKING_API_URL}/completions`);
  }

  recordCompletion(completionData) {
    return api.post(`${TRACKING_API_URL}/completions`, completionData);
  }

  // Feedback
  getAllFeedback() {
    return api.get(`${TRACKING_API_URL}/feedback`);
  }

  recordFeedback(feedbackData) {
    return api.post(`${TRACKING_API_URL}/feedback`, feedbackData);
  }
}

export default new TrackingService();
