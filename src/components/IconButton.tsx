import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { ReactNode } from 'react';

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
}

export default function IconButton({
    children,
    icon,
    className
}: IconButtonProps) {
  return (
    <Button
      className={className}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={icon}
    >
      {children}
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}
