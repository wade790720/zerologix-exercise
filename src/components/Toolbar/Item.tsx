import style from './Toolbar.module.scss'

type Props = {
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void
} & ReactProps.WithChildren

const Item = ({ ...props }: Props) => {
  return (
    <div className={style.button} onClick={props.onClick}>
      <div className={style.bg}>
        <span className={style.icon}>
          {props.children}
        </span>
      </div>
    </div>
  )
}
export default Item