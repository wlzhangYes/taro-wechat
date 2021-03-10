import { ScrollView,Text, View } from '@tarojs/components';
import { Component } from 'react'
import './index.less'

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activedIndex:0
    };
  }
  changeTab = (activedIndex) =>{
    this.setState({activedIndex})
  }
  render () {
    const {tabBar} = this.props;
    const {activedIndex} = this.state;
    return (
      <ScrollView
        className='scroll-view-tab'
        scrollX
        scrollWithAnimation
        lowerThreshold={20}
        upperThreshold={20}
      >
        {
          tabBar.map((item,index) => (
              <View key={index} className='tab-content' onClick={this.changeTab.bind(this,index)}>
                <Text>{item}</Text>
                <Text className={activedIndex === index ? 'actived-line' : ''} ></Text>
              </View>
          ))
        }
      </ScrollView>
    )
  }
}

export default Tab



