import { cn } from '@/lib/utils';
import { getAllDates, getAllMonths, getPreviousYears } from '@/utils/datetime';

const CraftediOSTimeSlider: React.FunctionComponent = () => {
  const dateContent = getAllDates();
  const monthContent = getAllMonths();
  const yearContent = getPreviousYears(100);
  const sliderFixedVerticalLength = 'h-[224px]';

  const playSliderAudio = function () {
    const sliderAudio = new Audio('/media/audio/slider-sound.mp3');
    sliderAudio.play();
  };

  return (
    <div className="ios-time-slider-component cursor-default select-none w-[356px] max-md:w-[256px] flex flex-row items-center justify-center gap-12 ">
      <div
        className="date-content-slide-container overflow-y-scroll"
        onScroll={() => {
          playSliderAudio();
        }}>
        <ul
          className={cn(
            'date-content-slide-list grid grid-cols-1 items-center text-center',
            sliderFixedVerticalLength,
          )}>
          {dateContent?.map((date, dateIndex) => {
            return (
              <li className="date-content-slide-item" key={dateIndex}>
                {date}
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className="month-content-slide-container overflow-y-scroll"
        onScroll={() => {
          playSliderAudio();
        }}>
        <ul
          className={cn(
            'date-content-slide-list grid grid-cols-1 items-center text-center',
            sliderFixedVerticalLength,
          )}>
          {monthContent?.map((month, monthIndex) => {
            return (
              <li className="month-content-slide-item" key={monthIndex}>
                {month?.full}
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className="year-content-slide-container overflow-y-scroll"
        onScroll={() => {
          playSliderAudio();
        }}>
        <ul
          className={cn(
            'date-content-slide-list grid grid-cols-1 items-center text-center',
            sliderFixedVerticalLength,
          )}>
          {yearContent?.map((year, yearIndex) => {
            return (
              <li className="year-content-slide-item" key={yearIndex}>
                {year}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CraftediOSTimeSlider;
