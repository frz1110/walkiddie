import React from 'react';
import { useState } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import './WalkiddieOnboarding.css';
import bantuanIcon from './Questions-cuate.svg';

const WalkiddieOnboarding = ({ steps }) => {
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
        <div className="onboarding-wrapper-adhyt">
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
            <div class="button-petunjuk" onClick={handleClickPetunjuk} id="petunjuk">
                <div>
                    <img class="img-petunjuk"src={bantuanIcon} alt="Bantuan"></img>
                </div>
                {/* <button class="button-petunjuk">Petunjuk</button> */}
            </div>
        </div>
    );
}
export default WalkiddieOnboarding;
