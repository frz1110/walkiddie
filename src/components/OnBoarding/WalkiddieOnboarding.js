import React from 'react';
import { useState } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import './WalkiddieOnboarding.css';

const WalkiddieOnboarding = ({steps}) => {
    const [isRun, setIsRun] = useState(false);

    const handleJoyrideCallback = (data) => {
        const { status, type } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setIsRun(false);
        }

        console.groupCollapsed(type);
        console.log(data);
        console.groupEnd();
    };

    const handleClickPetunjuk = (e) => {
        e.preventDefault();
        setIsRun(true)
    };

    return (
        <div>
            <Joyride
                callback={handleJoyrideCallback}
                continuous={true}
                run={isRun}
                scrollToFirstStep={true}
                showProgress={true}
                showSkipButton={true}
                steps={steps}
                styles={{
                    options: {
                        zIndex: 10000,
                    },
                }}
            />
            <div onClick={handleClickPetunjuk} id="petunjuk">
                <button class="button-petunjuk">Petunjuk</button>
            </div>
        </div>
    );
}
export default WalkiddieOnboarding;
