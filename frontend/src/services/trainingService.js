import api from './api';

const TRAINING_API_URL = '/api/training';

class TrainingService {
  // Training Programs
  getAllPrograms() {
    return api.get(`${TRAINING_API_URL}/programs`);
  }

  getProgramById(id) {
    return api.get(`${TRAINING_API_URL}/programs/${id}`);
  }

  createProgram(programData) {
    return api.post(`${TRAINING_API_URL}/programs`, programData);
  }

  updateProgram(id, programData) {
    return api.put(`${TRAINING_API_URL}/programs/${id}`, programData);
  }

  deleteProgram(id) {
    return api.delete(`${TRAINING_API_URL}/programs/${id}`);
  }

  // Training Sessions
  getAllSessions() {
    return api.get(`${TRAINING_API_URL}/sessions`);
  }

  getSessionById(id) {
    return api.get(`${TRAINING_API_URL}/sessions/${id}`);
  }

  createSession(programId, sessionData) {
    return api.post(`${TRAINING_API_URL}/sessions/program/${programId}`, sessionData);
  }

  updateSession(id, sessionData) {
    return api.put(`${TRAINING_API_URL}/sessions/${id}`, sessionData);
  }

  deleteSession(id) {
    return api.delete(`${TRAINING_API_URL}/sessions/${id}`);
  }
}

export default new TrainingService();
