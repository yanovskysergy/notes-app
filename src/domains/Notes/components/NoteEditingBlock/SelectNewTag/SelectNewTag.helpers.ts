interface GetPositionParam {
  tagPosition?: {
    top: number;
    left: number;
  };
  inputSize: {
    height: number;
    width: number;
  };
  paperSize: {
    height: number;
    width: number;
  };
}

const LINE_HEIGHT_WITH_MARGIN = 30;
const PADDING = 10;

export const getPosition = ({
  tagPosition,
  inputSize,
  paperSize,
}: GetPositionParam) => {
  if (tagPosition) {
    const left = Math.max(
      PADDING,
      Math.min(
        tagPosition.left - paperSize.width / 2 + 20,
        inputSize.width - paperSize.width - PADDING,
      ),
    );

    if (
      inputSize.height <
      tagPosition.top + paperSize.height + LINE_HEIGHT_WITH_MARGIN
    ) {
      // upper tag position
      return {
        left,
        top: tagPosition.top - paperSize.height,
      };
    }

    // below tag position
    return {
      left,
      top: tagPosition.top + LINE_HEIGHT_WITH_MARGIN,
    };
  }
};
