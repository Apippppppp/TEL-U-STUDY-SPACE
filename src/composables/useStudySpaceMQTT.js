
import { ref, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";

export function useStudySpaceMQTT() {
  const connected = ref(false);
  const sensorData = ref({
    motion: false,
    temperature: null,
    humidity: null,
    door: "UNKNOWN"
  });

  let socket;

  onMounted(() => {
    socket = io("http://localhost:3000");

    socket.on("connect", () => {
      connected.value = true;
      console.log("Website terhubung ke MQTT Bridge");
    });

    socket.on("disconnect", () => {
      connected.value = false;
    });

    socket.on("sensor-data", (payload) => {
      sensorData.value = payload.data;
      console.log("Data sensor:", payload.data);
    });
  });

  onUnmounted(() => {
    socket?.disconnect();
  });

  return {
    connected,
    sensorData
  };
}
