# LPU Smart Energy Pulse - Presentation Outline

**Duration**: 8-10 minutes  
**Target Audience**: Hackathon judges, technical and non-technical evaluators

---

## Slide 1: Title Slide
**Visual**: Logo + Tagline + Team Info

**Content**:
- **Title**: LPU Smart Energy Pulse
- **Tagline**: "Right Energy, Right Place, Right Time"
- **Subtitle**: Time-Aware Campus Energy Monitoring System
- **Team**: [Your Name] | [Team Name if applicable]
- **Event**: [Hackathon Name 2026]
- **Logo**: Custom-designed logo (campus buildings with energy pulse wave)

**Speaker Notes**: "Today I'm presenting LPU Smart Energy Pulse, a rule-based energy monitoring dashboard that helps identify when and where energy is being wasted on campus."

---

## Slide 2: The Problem - Energy Waste is Invisible
**Visual**: Icons showing campus buildings with question marks

**Content**:
- **Challenge**: LPU campus electricity bills keep increasing
- **Root Cause**: No visibility into energy usage patterns
- **Key Issues**:
  - ❌ Don't know which buildings consume when
  - ❌ Can't detect after-hours waste
  - ❌ Silent waste during idle periods goes unnoticed
  - ❌ No actionable insights from raw meter data

**Stats**: "Academic blocks using power at midnight? Labs left running over weekends? We had no way to know."

**Speaker Notes**: "The university has multiple building types—academic blocks, hostels, mess halls, library—each with different usage patterns. But there's no system to monitor whether energy is being wasted."

---

## Slide 3: Our Solution - Time-Aware Monitoring
**Visual**: Dashboard screenshot (summary cards section)

**Content**:
- **Core Concept**: Expected vs Actual usage comparison
- **How It Works**:
  1. Define expected hours per building type
  2. Compare against actual consumption
  3. Flag abnormal patterns
  4. Generate actionable insights

**Key Differentiator**: Not AI—100% transparent, rule-based logic

**Speaker Notes**: "Our solution is simple: every building has predictable schedules. We encoded those schedules as rules, then compare real data against expectations to detect waste."

---

## Slide 4: Building Category Logic
**Visual**: Table or infographic showing 4 building types

**Content**:
| Building Type | Expected High Usage | Logic |
|--------------|-------------------|-------|
| 🏛️ **Academic** | 9 AM - 5 PM | Working hours only |
| 🏨 **Hostel** | 6-9 AM, 6-11 PM | Morning prep + Evening |
| 🍽️ **Mess** | Breakfast, Lunch, Dinner | Meal times only |
| 📚 **Library** | All day except 12:30 AM - 8 AM | Inverted schedule |

**Speaker Notes**: "We created category-specific rules. For example, why is the mess hall consuming 45 kWh at 2 AM when no meals are being prepared? That's waste we can now detect."

---

## Slide 5: Live Dashboard Demo
**Visual**: Full dashboard screenshot with annotations OR live demo

**Content**:
- **Filter Controls**: Category, Building, Time Range
- **Summary Cards**: Total energy, highest consumer, abnormal usage count
- **Charts**: Bar (buildings), Line (hourly pattern), Pie (category distribution)
- **Waste Score**: Color-coded meter (Green/Yellow/Red)
- **Insights Panel**: Auto-generated alerts

**Annotation Highlights**: Point out abnormal usage markers on line chart

**Speaker Notes**: "Let me walk you through the interface. Users can filter by building, time range, or category. The dashboard immediately shows which buildings are wasting energy and why."

---

## Slide 6: Rule-Based Detection Logic
**Visual**: Flowchart showing detection process

**Content**:
```
Energy Data → Check Expected Hours → Calculate Waste %
                       ↓
           Is waste > threshold?
                  ↓           ↓
               YES: Alert   NO: Normal
                  ↓
         Generate Insight with Suggestion
```

**Waste Score Formula**:
```
Waste % = (Energy Outside Expected Hours / Total Energy) × 100
```

**Thresholds**:
- ✅ **Low**: < 15% (Efficient)
- ⚠️ **Medium**: 15-35% (Needs Attention)
- 🚨 **High**: > 35% (Critical)

**Speaker Notes**: "This is not a black-box AI. Every alert can be explained. We calculate the percentage of energy used outside expected hours, then classify based on clear thresholds."

---

## Slide 7: Smart Insights - Example Alert
**Visual**: Screenshot of insight card

**Content**:
**Example Insight Card**:

> 🚨 **Critical Alert - High Energy Waste**  
> **Building**: Academic Block B  
> **Category**: Academic  
> **Time Range**: 7:30 PM - 11:00 PM  
> **Expected Hours**: 9:00 AM - 5:00 PM  
> 
> **Issue Detected**:  
> Consumes 35% of energy outside working hours (7:30 PM - 11:00 PM).  
> 
> **Suggested Action**:  
> Inspect idle labs, computer rooms, and HVAC systems after working hours.

**Speaker Notes**: "Each insight is actionable. We don't just say 'high usage'—we explain when, why, and what to do about it."

---

## Slide 8: Tech Stack - Modern & Scalable
**Visual**: Technology icons and architecture diagram

**Content**:
- **Frontend**: React 18 (component-based UI)
- **Build Tool**: Vite (fast development)
- **Charts**: Recharts (data visualization)
- **Styling**: Vanilla CSS (no framework dependencies)
- **Data**: Static JSON (144 records, 6 buildings × 24 hours)
- **Deployment**: Vercel (instant deployment)

**Why These Choices**:
- ✅ Fast performance (Vite)
- ✅ Maintainable (React components)
- ✅ No backend needed (static data)
- ✅ Easy to scale (add more buildings/rules)

**Speaker Notes**: "We chose a modern stack that's fast to develop, easy to deploy, and simple to maintain. This could be deployed to production tomorrow."

---

## Slide 9: Impact & SDG Alignment
**Visual**: SDG 7 logo + impact metrics

**Content**:
**UN SDG 7**: Affordable & Clean Energy

**Projected Impact**:
- 🌱 **15-35% energy reduction** by eliminating detected waste
- 💰 **Significant cost savings** on electricity bills
- 🌍 **Lower carbon footprint** through efficient usage
- 📊 **Data-driven decisions** instead of guesswork

**Real-World Example**:
"If Academic Block B reduces its off-hours waste from 35% to 10%, that's a 25% reduction in building consumption—potentially thousands of kWh saved monthly."

**Speaker Notes**: "This isn't just about saving money. It's about sustainability. By making waste visible, we empower campus authorities to make informed decisions."

---

## Slide 10: Demo Access & Future Roadmap
**Visual**: QR code + roadmap timeline

**Content**:
**Try It Now**:
- 🌐 **Live Demo**: [Vercel URL]
- 📱 **QR Code**: [Generate QR to deployment]
- 💻 **GitHub**: [Repository link]

**Future Enhancements**:
- 📡 Real-time IoT sensor integration
- 📲 Mobile app (React Native)
- 📧 Email/SMS alerts for critical waste
- 📈 Historical trend analysis (ML-optional)
- 🏢 Multi-campus support

**Speaker Notes**: "The current version is fully functional with static data. Next steps include connecting to real energy meters and expanding to multiple campuses."

---

## Slide 11: Why This Matters (Closing Impact)
**Visual**: Before/After comparison

**Content**:
**Before Our System**:
- ❌ No visibility into when buildings waste energy
- ❌ Reactive (notice high bills after the fact)
- ❌ No way to prioritize interventions

**After Our System**:
- ✅ Real-time waste detection
- ✅ Proactive alerts with suggestions
- ✅ Data-driven energy management

**Quote**: "You can't manage what you can't measure. We made energy waste visible and actionable."

**Speaker Notes**: "This dashboard transforms how LPU manages energy—from blind spending to informed optimization."

---

## Slide 12: Thank You & Q&A
**Visual**: Team photo + contact info + logo

**Content**:
- **Thank You!**
- **Contact**: [Your Email / GitHub / LinkedIn]
- **Try the Demo**: [QR Code]
- **Questions?**

**Call to Action**: "I'm happy to demo specific features or discuss technical implementation."

---

## Backup Slides (If Needed)

### Backup: Data Structure
- JSON schema explanation
- Sample data records
- How to add new buildings

### Backup: Component Architecture
- React component tree
- State management flow
- Filter logic explanation

### Backup: Deployment Guide
- Local setup steps
- Vercel deployment process
- Environment variables (if any)

---

## Presentation Tips

1. **Start screen**: Dashboard open in browser (in case live demo requested)
2. **Time management**: Aim for 7-8 minutes, leaving 2-3 for Q&A
3. **Demo priority**: If time limited, show Slide 5 (Dashboard) live, not screenshot
4. **Anticipate questions**:
   - "Why not use AI?" → Transparency, explainability, no training data needed
   - "How accurate is waste detection?" → Based on campus-provided schedules, 100% rule-based
   - "Can this scale?" → Yes, just add more building rules and data

**Final Note**: Practice the demo flow (apply filter → show insight generation → explain waste score) to showcase interactivity.
