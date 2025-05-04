type Props = {
  onClick: () => void;
}

export default function SampleButton({ onClick }: Props) {
  return <button onClick={onClick}>Sample Button</button>;
}

