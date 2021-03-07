import React from 'react';

import './Wheel.css'
export default class Wheel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            lastItem: null,
            listWinner: [],
        };
        this.selectItem = this.selectItem.bind(this);
    }

    selectItem() {
        let self = this
        let listWinner = this.state.listWinner
        this.state.lastItem && self.props.removeItem(this.state.lastItem)
        const setRandom = () => {
            let selectedItem
            let result = Math.round(Math.random() * (this.props.listUser.length - 1) + 0)
            selectedItem = [result]
            listWinner.push(self.props.listUser[result])
            localStorage.setItem('listWinner', JSON.stringify(listWinner))
            self.setState({ selectedItem, lastItem: self.props.listUser[result], listWinner })

        }
        if (this.state.selectedItem != null)
            this.setState({ selectedItem: null }, () => setTimeout(
                () => setRandom(), 1000
            ))
        else setRandom()

    }

    render() {
        const { selectedItem } = this.state;
        const { listUser } = this.props;

        const wheelVars = {
            '--nb-item': listUser.length,
            '--selected-item': selectedItem,
        };
        const spinning = selectedItem !== null ? 'spinning' : '';

        return (
            <div className="wheel-container">
                <div className={`wheel ${spinning}`} style={wheelVars} >
                    {listUser.map((item, index) => (
                        <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                            <span>
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="btn-containter">
                    <img src="/buttonImg.png" className="btn-img" alt="" onClick={this.selectItem} />
                </div>
                <img src="/crown.png" alt="" className="crown" />
            </div>
        );
    }
}
