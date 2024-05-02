import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

interface IconButtonProps {
    children: ReactNode
    icon: ReactNode
    className?: string
    onClick?: () => void
    type?: HTMLInputTypeAttribute
    onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function IconButton({
    children,
    icon,
    className,
    onClick,
    type,
    onChange
}: IconButtonProps) {
  return (
    <Button
      className={className}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={icon}
      onClick={onClick}
    >
      {children}
      <VisuallyHiddenInput
        type={type ?? "button"}
        onChange={onChange}
      />
    </Button>
  );
}
