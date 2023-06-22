/**
=========================================================
* Soft UD - Demo - v4.0.0
=========================================================

* Product Page: https://www.Ambro-Dev.pl/product/soft-ui-dashboard-react
* Copyright 2022 Ambro-Dev (https://www.Ambro-Dev.pl)

Coded by Ambro-Dev

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  The rgba() function helps you to create a rgba color code, it uses the hexToRgb() function
  to convert the hex code into rgb for using it inside the rgba color format.
 */

// Soft UD - Demo helper functions
import hexToRgb from "assets/theme/functions/hexToRgb";

function rgba(color, opacity) {
  return `rgba(${hexToRgb(color)}, ${opacity})`;
}

export default rgba;
