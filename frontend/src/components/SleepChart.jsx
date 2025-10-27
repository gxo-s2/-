import React from 'react';
// Recharts 라이브러리는 직접 포함하지 않고, 컴포넌트 이름과 데이터 구조만 명시합니다.
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * 수면 기록 데이터를 시각화하는 컴포넌트입니다.
 * 부모 컴포넌트로부터 sleepRecords를 props로 받습니다.
 */
const SleepChart = ({ sleepRecords }) => {
  // 데이터를 일별 총 수면 시간으로 가공하는 로직
  const processSleepData = (records) => {
    const dailySleep = {};

    records.forEach(record => {
      const sleepDate = record.date; // YYYY-MM-DD
      const sleepTimeStr = record.sleepTime; // HH:MM
      const wakeTimeStr = record.wakeTime; // HH:MM

      // Date 객체로 변환하여 시간 계산
      const sleepDateTime = new Date(`${sleepDate}T${sleepTimeStr}:00`);
      let wakeDateTime = new Date(`${sleepDate}T${wakeTimeStr}:00`);

      // 취침 시간이 기상 시간보다 늦으면 다음 날로 간주
      if (wakeDateTime < sleepDateTime) {
        wakeDateTime.setDate(wakeDateTime.getDate() + 1);
      }

      const durationMs = wakeDateTime - sleepDateTime;
      const durationHours = durationMs / (1000 * 60 * 60);

      if (dailySleep[sleepDate]) {
        dailySleep[sleepDate] += durationHours;
      } else {
        dailySleep[sleepDate] = durationHours;
      }
    });

    // Recharts에서 사용할 수 있는 배열 형태로 변환
    // { date: 'YYYY-MM-DD', '수면 시간': 8.5 }
    const chartData = Object.keys(dailySleep).map(date => ({
      date,
      '수면 시간': parseFloat(dailySleep[date].toFixed(2)),
    }));

    // 날짜 순으로 정렬
    chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return chartData;
  };

  const chartData = processSleepData(sleepRecords);

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">주간 수면 시간 추이</h2>
      <div className="w-full h-80">
        {/* Recharts ResponsiveContainer를 사용하여 반응형 차트 구현 */}
        {/* <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="수면 시간" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer> */}
        {chartData.length > 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">차트가 여기에 표시됩니다. (Recharts 라이브러리 필요)</p>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">시각화할 수면 기록이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SleepChart;
