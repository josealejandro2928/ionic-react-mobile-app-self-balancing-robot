/* eslint-disable react-hooks/exhaustive-deps */
import { memo, ReactNode, useEffect, useState } from "react"
import './Tab.scss'
import { useRef } from 'react';

interface TabContainerProp {
    children: Array<{ props: any }> | { props: any };
    activeIndex?: number;
    backgroundColor?: string;
    color?: string;
    indicatorStyle?: 'simple' | 'bottomLine' | 'button'
    onTabChange?: Function,
    lazy?: boolean;
}

interface TabHeader {
    active: boolean;
    label: string;
    icon?: JSX.Element | string | null | undefined;
}

const TabContainer = ({
    activeIndex = 0,
    children,
    backgroundColor = 'inherit',
    color = '#428CFF',
    indicatorStyle = 'bottomLine',
    onTabChange = (index: number) => { },
    lazy = false }:
    TabContainerProp) => {

    const [header, setHeader] = useState<Array<TabHeader>>([]);
    const [activeTab, setActiveTab] = useState(activeIndex);
    const tabContainerRef = useRef(null)

    useEffect(() => {
        const tabsItems = children instanceof Array ? children : [children];
        checkChildrens(tabsItems);
        const tabs = tabsItems.map(el => ({ active: false, label: el.props.name, icon: el.props.icon }))
        if (activeIndex > tabs.length - 1 || activeIndex < 0)
            throw new Error(`Invalid range for activeIndex ${activeIndex}`);
        tabs[activeIndex].active = true;
        setHeader(tabs);
    }, [children])

    useEffect(() => {
        if (header && header.length) {
            onActivateTab(activeIndex);
            if (activeIndex > header.length - 1 || activeIndex < 0)
                throw new Error(`Invalid range for activeIndex ${activeIndex}`);
        }
    }, [activeIndex])

    useEffect(() => {
        if (header && header.length) {
            onTabChange(activeTab);
        }
    }, [activeTab])

    function onActivateTab(itemIndex: number) {
        const tabs = header.map((el, index) => {
            el.active = itemIndex === index ? true : false;
            return el;
        })
        setHeader(tabs);
        setActiveTab(itemIndex)
    }

    function checkChildrens(data: any[]) {
        data.map((el: any) => {
            if (!el.props.name)
                throw new Error('Inside of TabContainer component only can be rendered TabItem component, and its need a name prop')
            return true;
        })
    }

    const tabsItems = children instanceof Array ? children : [children];

    return <div ref={tabContainerRef} className="tab-pp">
        <div className="header" style={{ backgroundColor: backgroundColor }}>
            {header.map((el, index) => (
                <div onClick={() => onActivateTab(index)} key={el.label}
                    style={{
                        color: el.active && (indicatorStyle === 'simple' || indicatorStyle === 'bottomLine') ? color : 'inherit',
                        backgroundColor: el.active && (indicatorStyle === 'button') ? color : 'inherit',
                    }}
                    className={el.active ? `itemlabel ${indicatorStyle}` : 'itemlabel'} >
                    {el.icon} {el.label}
                    {indicatorStyle === 'bottomLine' && (<div style={{ backgroundColor: color }}></div>)}
                </div>
            ))}
        </div>
        <div className="body">
            {tabsItems.map((tabEl, index) => {
                if (index < activeTab) {
                    return (<div style={{
                        transform: 'translate3d(-100%, 0px, 0px)',
                        height: '0px',
                        overflow: 'hidden'
                    }} key={index} className={'body-content'}>
                        {!lazy && tabEl}
                    </div>)
                }
                if (index > activeTab) {
                    return (<div style={{
                        transform: 'translate3d(100%, 0px, 0px)',
                        height: '0px',
                        overflow: 'hidden'
                    }} key={index} className={'body-content'}>
                        {!lazy && tabEl}
                    </div>)
                }
                else {
                    return (<div style={{
                        visibility: 'inherit',
                        overflow: 'auto',
                        height: 'auto'
                    }} key={index} className={'body-content'}>
                        {tabEl}
                    </div>)
                }
            })}

        </div>

    </div>
}

export const TabItem = memo(({ name, children, icon = null, type = 'TabItem' }:
    {
        name: string;
        children: ReactNode, icon?: JSX.Element | string | null | undefined;
        type?: string
    }) => {
    return <div>
        {children}
    </div>
})


export default memo(TabContainer)
