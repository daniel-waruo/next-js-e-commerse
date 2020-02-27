export const style =
  `
@-webkit-keyframes invert-color {
  0% {
    filter: invert(0%);
  }
  50% {
    filter: invert(100%);
  }
  100% {
    filter: invert(90%);
  }
}

@keyframes invert-color {
  0% {
    filter: invert(0%);
  }
  50% {
    filter: invert(100%);
  }
  100% {
    filter: invert(90%);
  }
}

/* Center the loader */
#loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  margin: -75px 0 0 -75px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #4d4d4d;
  border-right: 16px solid #808080;
  border-bottom: 16px solid #bfbfbf;
  border-left: 16px solid #1f2d36;
  width: 100px;
  height: 100px;
  -webkit-animation: spin 0.5s linear infinite;
  animation: spin 0.5s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

#loader-background {
  position: fixed;
  position: -ms-device-fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  z-index: 9999;
  /*background-color:black;*/
}

.animate-top {
  position: relative;
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 1s;
  animation-name: animatetop;
  animation-duration: 1s
}

@-webkit-keyframes animatetop {
  from {
    top: -50%;
    opacity: 1
  }
  to {
    top: 0;
    opacity: 1
  }
}

@keyframes animatetop {
  from {
    top: -50%;
    opacity: 1
  }
  to {
    top: 0;
    opacity: 1
  }
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ebefec;
  z-index: 10000;
  color: black;
  font-size: 5vmin;
  letter-spacing: 3vmin;
  transition: .5s;
  -webkit-animation: invert-color 1.5s; /* Safari 4.0 - 8.0 */
  animation: invert-color 1.5s;
}

.background span {
  background: #ebefec;
  padding-left: 0;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  width: -moz-max-content;
  display: block;
  margin-top: 18.6vmin;
}

.background span:before {
  text-align: center;
  display: inline-block;
  width: max-content;
  width: -moz-max-content;
}

.background_marge_title {
  position: absolute;
  background: black;
  width: 100vw;
  height: 0.5vh;
  top: 22.1vmin;
  z-index: -1;
}

.loader {
  z-index: 10001;
  position: absolute;
  top: 58%;
  left: 50.2%;
  transition: .5s;
}

.load_base {
  position: absolute;
  background: black;
}

.load1,
.load2 {
  width: 20vmin;
  height: 20vmin;
  left: calc(50% - 1.25vmin - 10vmin);
  top: calc(50% - 1.25vmin - 10vmin);
}

.load1 {
  animation: load1 2s ease infinite;
}

.load2 {
  background: transparent;
  animation: load2 2s ease infinite;
}

.out_loader {
  width: 18vmin;
  height: 18vmin;
  left: calc(50% - 9vmin);
  top: calc(50% - 9vmin);
  background: #ebefec;
  animation: load1 2s ease infinite;
}

.in_loader {
  width: 3vmin;
  height: 3vmin;
  border: 0.3vmin solid black;
  border-radius: 100vmin;
  background: #ebefec;
}

.in_loader1 {
  animation: in_load1 2s ease infinite;
}

.in_loader2 {
  animation: in_load2 2s ease infinite;
}

.in_loader3 {
  animation: in_load3 2s ease infinite;
}

.in_loader4 {
  animation: in_load4 2s ease infinite;
}

@keyframes load1 {
  0% {
    transform: rotate(0deg);
    border-radius: 2vmin;
  }
  60% {
    transform: rotate(360deg);
    border-radius: 10vmin;
  }
  80% {
    transform: rotate(360deg);
    border-radius: 7vmin;
  }
  90% {
    transform: rotate(360deg);
    border-radius: 3.5vmin;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 2vmin;
  }
}

@keyframes load2 {
  0% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(-360deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes in_load1 {
  0% {
    opacity: 0;
    top: calc(50% - 1.25vmin);
    left: calc(50% - 1.25vmin);
  }
  25% {
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  60% {
    top: calc(-50% - 1.25vmin);
    left: calc(50% - 1.25vmin);
  }
  68% {
    opacity: 1;
  }
  72% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    top: calc(50% - 1.25vmin);
    left: calc(50% - 1.25vmin);
  }
}

@keyframes in_load2 {
  0% {
    opacity: 0;
    top: calc(50% - 1.25vmin);
    left: calc(50% - 1.25vmin);
  }
  25% {
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  70% {
    top: calc(50% - 1.25vmin);
    left: calc(150% - 1.25vmin);
  }
  76% {
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    top: calc(50% - 1.25vmin);
    left: calc(50% - 1.25vmin);
  }
}

@keyframes in_load3 {
  0% {
    opacity: 0;
    top: calc(50% - 1.25vmin);
    left: calc(50% - 1.25vmin);
  }
  25% {
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  80% {
    top: calc(150% - 1.25vmin);
    left: calc(50% - 1.25vmin);
  }
  84% {
    opacity: 1;
  }
  88% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    top: calc(50% - 1.25vmin);
    left: calc(50% - 1.25vmin);
  }
}

@keyframes in_load4 {
  0% {
    opacity: 0;
    top: calc(50% - 1.25vmin);
    left: calc(50% - 1.25vmin);
  }
  25% {
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  90% {
    top: calc(50% - 1.25vmin);
    left: calc(-50% - 1.25vmin);
  }
  91% {
    opacity: 1;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    top: calc(50% - 1.25vmin);
    left: calc(50% - 1.25vmin);
  }
}

.fa-loader {
  margin-left: -12px;
  margin-right: 8px;
}`