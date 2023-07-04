/**
=========================================================
* Soft UD - Demo - v4.0.0
=========================================================

* Product Page: https://www.soft.ambro.dev
* Copyright 2023 Ambro-Dev (https://www.ambro.dev)

Coded by Ambro-Dev

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  The linearGradient() function helps you to create a linear gradient color background
 */

function linearGradient(color, colorState, angle = 310) {
  return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
}

export default linearGradient;
