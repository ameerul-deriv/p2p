import { TTextColors } from 'types';
import { render, screen } from '@testing-library/react';
import AdType from '../AdType';

const mockProps = {
    adPauseColor: 'red' as TTextColors,
    floatRate: '1.23',
};

jest.mock('@deriv-com/ui', () => ({
    ...jest.requireActual('@deriv-com/ui'),
    useDevice: () => ({ isDesktop: true }),
}));

describe('AdType', () => {
    it('should render the component as expected', () => {
        render(<AdType {...mockProps} />);
        expect(screen.getByText('Float')).toBeInTheDocument();
        expect(screen.getByText('1.23%')).toBeInTheDocument();
    });
});
