import WalkiddieOnboarding from './WalkiddieOnboarding';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('<WalkiddieOnboarding />', () => {
    it('display onboarding', () => {
        const onBoardingSteps = [
            {
                content: <h5>Homepage mitra</h5>,
                locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
                placement: 'center',
                target: 'body',
            },
            {
                content: <h4>Selesai</h4>,
                placement: 'center',
                target: 'body',
            },
        ];

        const { getByText } = render(<WalkiddieOnboarding steps={onBoardingSteps} />)

        // const btnPetunjuk = getByText("Petunjuk");
        // userEvent.click(btnPetunjuk);
    });
})