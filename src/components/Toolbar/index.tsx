import style from './Toolbar.module.scss'
import Item from './Item'

const Toolbar = ({...props}: ReactProps.Component) => {
  return (
    <div className={style.wrapper}>
      {props.children}
    </div>
  )
}

Toolbar.Item = Item

export default Toolbar