import styled from 'styled-components'

interface IconProps {
  icon: string
  color?: string
  size?: number
  className?: string
  alt?: string
}

type IconMaskProps = Omit<IconProps, 'icon'> & { $icon: string }

const IconMask = styled.div.attrs<IconMaskProps>((props) => ({
  // mapeia a prop `alt` para aria-label e define role="img" quando houver alt
  'aria-label': props.alt ?? undefined,
  role: props.alt ? 'img' : undefined
}))<IconMaskProps>`
  width: ${(props) => props.size ?? 24}px;
  height: ${(props) => props.size ?? 24}px;
  background-color: ${(props) => props.color || props.theme.white};
  mask-image: url(${(props) => props.$icon});
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  display: inline-block;
`

export default function Icon({ icon, color, size, className, alt }: IconProps) {
  return <IconMask $icon={icon} color={color} size={size} className={className} alt={alt} />
}
