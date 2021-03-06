import { React, useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";

const COLORS = {
  월: "#8884d8",
  화: "#8884d8",
  수: "#8884d8",
  목: "#8884d8",
  금: "#8884d8",
  토: "#cc0000",
  일: "#cc0000",
  평일: "red",
};

const STANDARD = {
  by_time: "time",
  by_day: "day",
  by_holiday: "holiday",
  by_mealtime1: "area2",
  by_mealtime2: "area3",
};
const MAX_STANDARD = {
  by_time: "auto",
  by_day: "auto",
  by_holiday: "auto",
  by_mealtime: "auto",
};
const getColor = (bar) => COLORS[bar.indexValue];

const MyResponsiveBar = ({ data, standardBy }) => {
  return (
    <ResponsiveBar
      colors={getColor}
      data={data}
      keys={["freqavg"]}
      indexBy={STANDARD[standardBy]}
      maxValue={MAX_STANDARD[standardBy]}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      animate={true}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        format: (e) => Math.floor(e) === e && e,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "배달 건수",
        legendPosition: "middle",
        legendOffset: -40,
      }}
    />
  );
};

export default MyResponsiveBar;
