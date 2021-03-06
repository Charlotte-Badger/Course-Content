import React from 'react';
import Element from './Element.jsx';
import moment from 'moment';
import {Div, Span, SectionHeader, TopSectionHeader, SectionTitle, SectionTotalLectures, SectionElementsBlock, ElementsContainer, Ul, H3} from './StyledComponents';

class Section extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      headerStyle: {
        height: '55px'
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }

  getDisplayTime(time) {
    if (moment.utc(time).format('HH') === '00') {
      const displayTime = moment.utc(time).format('m[min]');
      this.setState({displayTime});
    } else {
      const displayTime = moment.utc(time).format('H[hr ]m[min]');
      this.setState({displayTime});
    }
  }

  shortenTitle(title) {
    if (title.length > 50) {
      for (let i = 50; i < title.length; i++) {
        if (title[i] === ' ') {
          let charArr = title.split('').slice(0, i);
          charArr.push('\n');
          let full = charArr.concat(title.split('').slice(i + 1, title.length));
          const shortenedTitle = full.join('');
          let headerStyle = this.state.headerStyle;
          headerStyle['height'] = '75px';
          this.setState({
            title: shortenedTitle,
            headerStyle
          });
          break;
        }
        if (i === title.length - 1) {
          this.setState({ title });
        }
      }
    } else {
      this.setState({title});
    }
  }

  handleClick() {
    this.props.toggleView(this.props.idx);
  }

  componentDidMount() {
    this.getDisplayTime(this.props.section.sectionLength);
    this.shortenTitle(this.props.section.title);

    if (this.props.idx === 0) {
      let headerStyle = this.state.headerStyle;
      headerStyle['borderTopLeftRadius'] = '4px';
      headerStyle['borderTopRightRadius'] = '4px';
      this.setState({headerStyle});
    }

  }

  render() {

    return (
      <Div style={{display: this.props.section.sectionDisplay}}>
        <Div>
          <SectionHeader style={this.state.headerStyle} onClick={this.handleClick.bind(this)}>
            <H3>
              <Span>
                <SectionTitle>{this.state.title}</SectionTitle>
                <SectionTotalLectures>
                  {`${this.props.section.lectures + this.props.section.articles} lectures ??? `}
                  <Span>
                    {this.state.displayTime}
                  </Span>
                </SectionTotalLectures>
              </Span>
            </H3>
          </SectionHeader>
          {this.props.section.elementDisplay === 'block' &&
            <SectionElementsBlock style={{ display: this.props.section.elementDisplay }}>
              <ElementsContainer>
                <Ul>
                  {this.props.section.elements.map(element =>
                    <Element element={element} key={`element${element.elementId}`} kind={element.kind} />
                  )}
                </Ul>
              </ElementsContainer>
            </SectionElementsBlock>
          }
        </Div>
      </Div>
    );
  }

}

export default Section;