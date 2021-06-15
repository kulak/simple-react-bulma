import React from 'react'

export interface DropdownItemProps {
    name: string
    onClick: ()=>void
}
export const DropdownItem: React.FC<DropdownItemProps> = ({name, onClick}) => {
    return (<a href="#" className="dropdown-item" onClick={onClick}>{name}</a>)
}

export interface DropdownProps {
    name: string
}
export function Dropdown(props: React.PropsWithChildren<DropdownProps>):JSX.Element {
    const [isActive, setIsActive] = React.useState(false)
    const close = () => { setIsActive(false) }
    return (
        <div className={"control dropdown " + (isActive ? 'is-active' : '')}>
            <div className={'dropdown-trigger'}>
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu"
                    onClick={() => {
                        console.log("on trigger click")
                        setIsActive(!isActive)
                    }}
                >
                    <span>{props.name}</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content" onMouseLeave={close} onClick={close}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}