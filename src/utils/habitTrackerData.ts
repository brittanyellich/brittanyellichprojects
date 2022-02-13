import cookies from "js-cookie";
import { format, getDaysInMonth } from "date-fns";

interface HabitTrackerData {
  title: string;
  data: number[];
}

const getDateStringCookieTitle = (today: Date) => {
  return "habit-tracker-" + format(today, "MMyyyy");
};

const getEmptyColumn = (days: number) => {
  const column: number[] = [];
  for (let day = 1; day <= days; day++) {
    column.push(0);
  }
  return column;
};

const getEmptyDataArray = (today: Date) => {
  const daysInMonth = getDaysInMonth(today);
  const emptyDataArray: number[][] = [];

  emptyDataArray.push(getEmptyColumn(daysInMonth));
  return emptyDataArray;
};

const mergeTitlesAndData = (titles: string[], data: number[][]) => {
  return titles.map((title, index) => {
    const habitTrackerData: HabitTrackerData = {
      title,
      data: data[index],
    };
    return habitTrackerData;
  });
};

export const getHabitTrackerData = (today: Date) => {
  const titleString = cookies.get("titles");
  const titles = titleString ? JSON.parse(titleString).titles : ["New habit"];

  const dateCookie = cookies.get(getDateStringCookieTitle(today));
  const dateCookieData = dateCookie
    ? JSON.parse(dateCookie).data
    : [getEmptyDataArray(today)];

  return mergeTitlesAndData(titles, dateCookieData);
};

export const updateTrackerData = (
  today: Date,
  titleIndex: number,
  dayIndex: number,
  checked: boolean
) => {
  const dateCookieString = getDateStringCookieTitle(today);
  const dateCookie = cookies.get(dateCookieString);
  const dateCookieData = dateCookie
    ? JSON.parse(dateCookie).data
    : [getEmptyDataArray(today)];

  dateCookieData[titleIndex][dayIndex] = checked ? 1 : 0;
  cookies.set(dateCookieString, JSON.stringify({ data: dateCookieData }));
};

export const addNewHabit = (today: Date) => {
  const titleString = cookies.get("titles");
  const titles = titleString ? JSON.parse(titleString).titles : ["New habit"];
  titles.push("New habit");

  cookies.set("titles", JSON.stringify({ titles: titles }));

  const dateCookieString = getDateStringCookieTitle(today);
  const dateCookie = cookies.get(dateCookieString);
  const dateCookieData = dateCookie
    ? JSON.parse(dateCookie).data
    : [getEmptyDataArray(today)];

  dateCookieData.push(getEmptyDataArray(today));
  cookies.set(dateCookieString, JSON.stringify({ data: dateCookieData }));
};
