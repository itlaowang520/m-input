import React from 'react';
import PropTypes from 'prop-types';
import {CommonFunc} from 'ks-mweb-modules';
import './index.scss';
export default class InputItem extends React.Component {
    static defaultProps = {
        type: 'text',
        placeholder: '请输入',
        maxLength: 9999999,
        disabled: false
    };
    static propTypes = {
        type: PropTypes.string, // 输入框类型
        placeholder: PropTypes.string, // placeholder
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // 输入框的默认值
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // 输入框的值
        onChange: PropTypes.func, // 输入框改变回调
        // onFocus: PropTypes.func, // 输入框获焦回调
        // onBlur: PropTypes.func, // 输入框失焦回调
        maxLength: PropTypes.number, // 最大长度
        disabled: PropTypes.bool, // 是否禁用
        stateName: PropTypes.string, // 改变相应父组件中state的名称
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    };
    /**
     * 输入框改变
     * @param e
     */
    onChange = (e) => {
        if (this.props.maxLength && e.target.value.length >= this.props.maxLength) {
            e.target.value = e.target.value.substr(0, this.props.maxLength);
        }
        this.props.onChange(this.props.stateName, e.target.value);
    };
    /**
     * 解决iPhone X 键盘遮挡输入框
     */
    onFocus = (e) => {
        if (CommonFunc.isIPhoneX()) {
            setTimeout(() => {
                document.body.scrollTop = document.body.scrollHeight;
            }, 300);
        }
    };
    render() {
        let inputDOM = '';
        const {disabled, defaultValue} = this.props;
        if (this.props.type === 'number') {
            inputDOM = <input
                type={CommonFunc.getSystemInfo() === 'ios' ? 'text' : 'number'}
                inputMode='numeric' pattern='[0-9]*'
                placeholder={this.props.placeholder}
                onBlur = {this.onFocus}
                onFocus = {this.onFocus}
                disabled={disabled}
                defaultValue = {defaultValue}
                value={this.props.value}
                maxLength={this.props.maxLength}
                onChange={(e) => {
                    this.onChange(e);
                }}
            />;
        } else {
            inputDOM = <input
                type={this.props.type === 'password' ? 'password' : 'text'}
                placeholder={this.props.placeholder}
                onBlur = {this.onFocus}
                onFocus = {this.onFocus}
                disabled={disabled}
                defaultValue = {defaultValue}
                value={this.props.value}
                maxLength={this.props.maxLength}
                onChange={(e) => {
                    this.onChange(e);
                }}/>;
        }
        return (
            <div className="input-box">
                {inputDOM}
            </div>
        );
    }
};
