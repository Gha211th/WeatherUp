export const getWeatherDetails = (code) => {
  switch (code) {
    case 0:
      return { desc: "Cerah", icon: "ri-sun-line" };
    case 1:
      return { desc: "Dominan Cerah", icon: "ri-sun-cloudy-line" };
    case 2:
      return { desc: "Sebagian Berawan", icon: "ri-cloudy-line" };
    case 3:
      return { desc: "Mendung", icon: "ri-cloud-line" };
    case 45:
    case 48:
      return { desc: "Kabut", icon: "ri-foggy-line" };
    case 51:
    case 53:
    case 55:
      return { desc: "Gerimis", icon: "ri-drizzle-line" };
    case 61:
      return { desc: "Hujan Ringan", icon: "ri-rainy-line" };
    case 63:
      return { desc: "Hujan Sedang", icon: "ri-rainy-line" };
    case 65:
      return { desc: "Hujan Lebat", icon: "ri-heavy-showers-line" };
    case 80:
    case 81:
    case 82:
      return { desc: "Hujan Lokal", icon: "ri-showers-line" };
    case 95:
      return { desc: "Badai Petir", icon: "ri-thunderstorms-line" };
    case 96:
    case 99:
      return { desc: "Badai Petir & Es", icon: "ri-thunderstorms-line" };
    default:
      return { desc: "Cuaca Tidak Diketahui", icon: "ri-question-line" };
  }
};
