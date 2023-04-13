import { useCountdown } from "react-countdown-circle-timer";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useEffect } from "react";

function DYKMTimer({ timerSeconds }) {
    let localTimerSeconds = 60;
    if (timerSeconds) localTimerSeconds = timerSeconds;
    console.log("Local timer", localTimerSeconds);

    const {
        path,
        pathLength,
        stroke,
        strokeDashoffset,
        remainingTime,
        elapsedTime,
        size,
        strokeWidth,

    } = useCountdown({ isPlaying: true, duration: localTimerSeconds, colors: '#abc'  })

    useEffect(() => {
        console.log("data:", remainingTime, localTimerSeconds);
    })

    const percentLeft = 100*(remainingTime/localTimerSeconds);
    let variant;
    let isStriped=false;
    if (percentLeft <= 50) variant = "warning";
    if (percentLeft <= 25) {
        isStriped = true;
        variant = "danger";
    }

    return (
        <div className='text-center mx-auto mb-1'>
            <ProgressBar striped={isStriped} variant={variant} now={percentLeft} />
        </div>
    )
}

/*<CountdownCircleTimer
    isPlaying
    key={localTimerSeconds}
    duration={localTimerSeconds}
    colors={['#52a546', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
    strokeLinecap={'butt'}
    strokeWidth={13}
>
    {({remainingTime}) => {
        if (remainingTime) {
            return (
                <div>
                    {remainingTime}
                </div>);
        } else {
            return (
                <div>
                    "Loading..."
                </div>
            );}}}
</CountdownCircleTimer>*/

export default DYKMTimer;
