import React from 'react'
import { fromJS } from 'immutable'
export default class Component extends React.Component {
    shouldComponentUpdate(nextProps) {
        let next = fromJS(nextProps) //生成不可变对象
        let now = fromJS(this.props)
        return !next.equals(now)
            // return true
    }
}