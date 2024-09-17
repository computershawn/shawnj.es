import { useMediaQuery } from '@chakra-ui/react';
import {
  contentTopMarginBig,
  contentTopMargin,
  headerHtBig,
  headerHt,
} from '../constants';

function useHeaderDims(nudge = false) {
  const [isLargerThan30em] = useMediaQuery('(min-width: 30em)');
  // Add some vertical space between header
  // and page content in selected layouts
  const topMarginBigAdjusted = nudge ? contentTopMarginBig : headerHtBig;
  const topMarginAdjusted = nudge ? contentTopMargin : headerHt;
  const topMargin = isLargerThan30em ? topMarginBigAdjusted : topMarginAdjusted;
  const headerHeight = isLargerThan30em ? headerHtBig : headerHt;

  return {
    topMargin,
    headerHeight,
  };
}

export { useHeaderDims };
