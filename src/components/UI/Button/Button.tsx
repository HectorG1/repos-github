import './button.css';
type ButtonProps = {
  label: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  type?: 'button' | 'submit';
  onClick?: () => void;
  buttonType?: 'primary' | 'secondary' | 'danger';
};

const BUUTON_SIZE = {
  sm: { width: '100px', height: '30px', fontSize: '12px' },
  md: { width: '150px', height: '35px', fontSize: '14px' },
  lg: { width: '200px', height: '40px', fontSize: '16px' },
  full: { width: '100%', height: '35px', fontSize: '14px' },
}

const BUTTON_TYPE = {
  primary: '#2563eb',
  secondary: '#6c757d',
  danger: '#dc3545',
}

export default function Button({ label, onClick, size = 'sm', type = 'button', buttonType = 'primary' }: ButtonProps) {

  const { width, height, fontSize } = BUUTON_SIZE[size];
  const backgroundColor = BUTTON_TYPE[buttonType];

  return (
    <button onClick={onClick} className="button" style={{ width, height, fontSize, backgroundColor }} type={type}>
      {label}
    </button>
  );
}