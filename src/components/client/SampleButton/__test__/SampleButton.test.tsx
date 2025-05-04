import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SampleButton from '../SampleButton';

describe('SampleButton', () => {
  it('ボタンが正しくレンダリングされること', () => {
    const clickHandler = () => {};
    render(<SampleButton onClick={clickHandler} />);
    const button = screen.getByRole('button', { name: 'Sample Button' });
    expect(button).toBeInTheDocument();
  });

  it('クリック時にonClickが呼び出されること', () => {
    const handleClick = jest.fn();
    render(<SampleButton onClick={handleClick} />);
    const button = screen.getByRole('button', { name: 'Sample Button' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
}); 