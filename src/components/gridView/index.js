import _ from 'lodash';
import React from 'react';
import { StyleSheet } from 'react-native'; // TODO: we should use asBaseComponent here instead of using UIComponent directly

import { Colors, Spacings } from "../../style";
import UIComponent from "../../commons/UIComponent";
import View from "../view";
import Text from "../text";
import { Constants } from "../../helpers";
import GridListItem from "../gridListItem";
import { formatLastItemLabel } from "../../helpers/FormattingPresenter";

/**
 * @description: A auto-generated grid view that calculate item size according to given props
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
class GridView extends UIComponent {
  static displayName = 'GridView';
  static defaultProps = {
    numColumns: 3,
    itemSpacing: Spacings.s4
  };

  constructor(props) {
    super(props);
    this.state = {
      viewWidth: Math.floor(props.viewWidth || this.getDefaultViewWidth()),
      numColumns: props.numColumns
    };
    this.itemSize = undefined;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let viewWidth;
    let numColumns;

    if (nextProps.viewWidth && Math.floor(nextProps.viewWidth) !== prevState.viewWidth) {
      viewWidth = Math.floor(nextProps.viewWidth);
    }

    if (!nextProps.keepItemSize && nextProps.numColumns !== prevState.numColumns) {
      numColumns = nextProps.numColumns;
    }

    if (viewWidth || viewWidth) {
      return {
        viewWidth,
        numColumns
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChanged);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChanged);
  }

  onOrientationChanged = () => {
    if (!this.props.viewWidth) {
      this.setState({
        viewWidth: Math.floor(this.getDefaultViewWidth()),
        numColumns: this.getCalculatedNumOfColumns()
      });
    }
  };

  shouldUpdateItemSize() {
    return !this.itemSize || !this.props.keepItemSize;
  }

  getDefaultViewWidth() {
    // @ts-ignore
    return Constants.screenWidth - Spacings.page * 2;
  }

  getCalculatedNumOfColumns() {
    const {
      itemSpacing,
      numColumns
    } = this.props;

    if (!this.shouldUpdateItemSize() && Constants.orientation === 'landscape' && this.itemSize && itemSpacing) {
      const numberOfColumns = this.getDefaultViewWidth() / (this.itemSize + itemSpacing);
      return Math.floor(numberOfColumns);
    }

    return numColumns;
  }

  getItemSize() {
    const {
      itemSpacing
    } = this.props;
    const {
      viewWidth,
      numColumns
    } = this.state;

    if (this.shouldUpdateItemSize() && viewWidth && itemSpacing && numColumns) {
      return (viewWidth - itemSpacing * (numColumns - 1)) / numColumns;
    }

    return this.itemSize;
  }

  getThemeColor(placeColor) {
    if (_.toLower(placeColor) === _.toLower(Colors.white)) {
      return Colors.black;
    } else if (Colors.isDark(placeColor)) {
      return placeColor;
    } else {
      return Colors.getColorTint(placeColor, 30);
    }
  }

  renderLastItemOverlay() {
    const {
      lastItemLabel,
      items
    } = this.props;
    const overlayColor = this.getThemeColor(this.props.lastItemOverlayColor ?? '');
    const formattedLabel = formatLastItemLabel(lastItemLabel, {
      shouldAddPlus: true
    });

    if (!lastItemLabel) {
      return;
    }

    const imageBorderRadius = _.chain(items).first().get('imageProps.borderRadius').value();

    return <View style={[styles.overlayContainer, {
      backgroundColor: Colors.rgba(overlayColor, 0.6),
      borderRadius: imageBorderRadius
    }]}>
        <Text mainBold white>
          {formattedLabel}
        </Text>
      </View>;
  }

  renderItem = (item, index) => {
    const {
      items,
      itemSpacing
    } = this.props;
    const {
      numColumns
    } = this.state;

    const itemsCount = _.size(items);

    const rowCount = itemsCount / numColumns;
    const isLastItemInRow = (index + 1) % numColumns === 0;
    const isLastRow = index + 1 > (rowCount - 1) * numColumns;
    const isLastItem = index === itemsCount - 1;
    const size = typeof item.itemSize === 'object' ? {
      width: this.itemSize,
      height: _.get(item.itemSize, 'height', this.itemSize)
    } : this.itemSize;
    return <GridListItem key={index} {...item} itemSize={size} containerStyle={[!isLastItemInRow && {
      marginRight: itemSpacing
    }, !isLastRow && {
      marginBottom: itemSpacing
    }, item.containerStyle]}>
        {isLastItem && this.renderLastItemOverlay()}
      </GridListItem>;
  };

  render() {
    const {
      items,
      viewWidth
    } = this.props;
    this.itemSize = this.getItemSize();
    return <View style={[styles.container, {
      width: viewWidth ? Math.floor(viewWidth) : undefined
    }]}>
        {this.itemSize && _.map(items, this.renderItem)}
      </View>;
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap'
  },
  overlayContainer: { ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default GridView;