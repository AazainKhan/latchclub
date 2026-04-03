"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  TextPlugin,
  ScrollToPlugin
)

// Force GPU acceleration globally
gsap.defaults({
  force3D: true,
})

export { gsap, ScrollTrigger, SplitText }
