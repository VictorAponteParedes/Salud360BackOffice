import axios from "axios";
import { API_BASE_URL } from "../constants";
import type { ScheduleItype } from "../types/schedule";

export class ScheduleService {
  async createSchedule(scheduleData: ScheduleItype){
    try {
      const response = await axios.post(`${API_BASE_URL}/schedules`, scheduleData);
      return response.data;
    } catch (error: any) {
      console.error("Error creating schedule:", error);
      throw error.response?.data || error;
    }
  }
}
