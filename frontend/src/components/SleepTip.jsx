import React from 'react';

/**
 * 수면 기록 데이터를 분석하여 맞춤형 팁을 제공하는 컴포넌트입니다.
 * 부모 컴포넌트로부터 sleepRecords를 props로 받습니다.
 */
const SleepTip = ({ sleepRecords }) => {
  // 지난 7일간의 평균 총 수면 시간을 계산하는 로직
  const calculateAverageSleep = (records) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6); // Include today and the past 6 days

    const recentRecords = records.filter(record => {
      const recordDate = new Date(record.date);
      recordDate.setHours(0, 0, 0, 0);
      return recordDate >= sevenDaysAgo && recordDate <= today;
    });

    if (recentRecords.length === 0) {
      return null; // No recent records to analyze
    }

    const dailySleepDurations = {};

    recentRecords.forEach(record => {
      const sleepDate = record.date; // YYYY-MM-DD
      const sleepTimeStr = record.sleepTime; // HH:MM
      const wakeTimeStr = record.wakeTime; // HH:MM

      const sleepDateTime = new Date(`${sleepDate}T${sleepTimeStr}:00`);
      let wakeDateTime = new Date(`${sleepDate}T${wakeTimeStr}:00`);

      if (wakeDateTime < sleepDateTime) {
        wakeDateTime.setDate(wakeDateTime.getDate() + 1);
      }

      const durationMs = wakeDateTime - sleepDateTime;
      const durationHours = durationMs / (1000 * 60 * 60);

      if (dailySleepDurations[sleepDate]) {
        dailySleepDurations[sleepDate] += durationHours;
      } else {
        dailySleepDurations[sleepDate] = durationHours;
      }
    });

    const totalSleepHours = Object.values(dailySleepDurations).reduce((sum, hours) => sum + hours, 0);
    const numberOfDays = Object.keys(dailySleepDurations).length;

    return totalSleepHours / numberOfDays;
  };

  const averageSleep = calculateAverageSleep(sleepRecords);

  let tipMessage = '수면 기록을 추가하여 맞춤형 팁을 받아보세요!';
  let cardClasses = 'bg-blue-100 border-blue-400 text-blue-700';

  if (averageSleep !== null) {
    if (averageSleep < 7) {
      tipMessage = '수면 부족 경고! 수면 환경을 점검해 보세요.';
      cardClasses = 'bg-red-100 border-red-400 text-red-700';
    } else if (averageSleep >= 7 && averageSleep <= 9) {
      tipMessage = '적정 수면 시간 달성! 현재 패턴을 유지하세요.';
      cardClasses = 'bg-green-100 border-green-400 text-green-700';
    } else if (averageSleep > 9) {
      tipMessage = '과도한 수면 위험! 일정한 기상 시간을 유지하세요.';
      cardClasses = 'bg-yellow-100 border-yellow-400 text-yellow-700';
    }
  }

  return (
    <div className={`border-l-4 p-4 mt-8 rounded-lg ${cardClasses}`}>
      <p className="font-bold text-lg mb-2">수면 팁</p>
      <p>{tipMessage}</p>
      {averageSleep !== null && (
        <p className="text-sm mt-2">지난 7일간 평균 수면 시간: {averageSleep.toFixed(2)} 시간</p>
      )}
    </div>
  );
};

export default SleepTip;
