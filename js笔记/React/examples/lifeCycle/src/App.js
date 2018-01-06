import React, { Component } from 'react';
import LifeCycle from './lifecycle'
import './App.css'
class App  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: Math.random() * 100
        };
    }

    propsChange() {
        this.setState({
            num: Math.random() * 100
        });
    }

    setLifeCycleState() {
        this.refs.rLifeCycle.setTheState();
    }

    forceLifeCycleUpdate() {
        //this.refs.rLifeCycle.forceItUpdate();
        this.forceUpdate();
    }

    unmountLifeCycle() {
        // 这里卸载父组件也会导致卸载子组件
        React.unmountComponentAtNode(document.getElementById("container"));
    }

    parentForceUpdate() {
        this.forceUpdate();
    }

    render() {
      console.log("父组件render")
        return (
            <div>
                <a href="javascript:;" className="weui_btn weui_btn_primary" onClick={this.propsChange.bind(this)}>propsChange</a>
                <a href="javascript:;" className="weui_btn weui_btn_primary" onClick={this.setLifeCycleState.bind(this)}>setState</a>
                <a href="javascript:;" className="weui_btn weui_btn_primary" onClick={this.forceLifeCycleUpdate.bind(this)}>forceUpdate</a>
                <a href="javascript:;" className="weui_btn weui_btn_primary" onClick={this.unmountLifeCycle.bind(this)}>unmount</a>
                <a href="javascript:;" className="weui_btn weui_btn_primary" onClick={this.parentForceUpdate.bind(this)}>parentForceUpdateWithoutChange</a>
                <LifeCycle ref="rLifeCycle" num={this.state.num}></LifeCycle>
                <LifeCycle ref="rLifeCycle" num={this.state.num}></LifeCycle>
                <LifeCycle ref="rLifeCycle" num={this.state.num}></LifeCycle>
            </div>
        );
    }
}  



export default App;
