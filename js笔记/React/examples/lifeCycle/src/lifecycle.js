import React, { Component } from 'react';
export default class LifeCycle extends React.Component {
    constructor(props) {
        super(props);
        console.log("********************");
        console.log("constructor");
        this.state = {str: "hello"};
    }

    componentWillMount() {
        console.log("componentWillMount");
        this.setState({str: "mapping"})
    }

    componentDidMount() {
        console.log("componentDidMount");
        console.log(this.refs.container)
    }

    componentWillReceiveProps(nextProps) {
        console.log("*******************************************************")
        console.log('componentWillReceivethis.props==',this.props)
        console.log('componentWillReceivePropsprops==',nextProps)
        console.log("componentWillReceiveProps");
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate");
        return true;        // 记得要返回true
    }

    componentWillUpdate() {
        console.log("componentWillUpdate");
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    setTheState() {
        let s = "hello";
        if (this.state.str === s) {
            s = "HELLO";
        }
        this.setState({
            str: s
        });
    }

    forceItUpdate() {
        this.forceUpdate();
    }

    render() {
        console.log("render");
        //console.log("render this.state",this.state);
        //console.log(this.refs.container)
        return(
            <div ref="container">
                <span>{"Props:"}<h2>{parseInt(this.props.num)}</h2></span>
                <br />
                <span>{"State:"}<h2>{this.state.str}</h2></span>
            </div>
        );
    }
}

