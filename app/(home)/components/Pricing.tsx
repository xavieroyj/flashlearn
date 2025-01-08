import * as motion from "motion/react-client";
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
    {
      name: 'Free',
      price: '0',
      period: 'month',
      features: [
        'Up to 100 flashcards',
        'Basic AI generation',
        'Personal collections',
        'Progress tracking',
      ],
    },
    {
      name: 'Paid',
      price: '15.90',
      period: 'month',
      features: [
        'Unlimited flashcards',
        '100 AI Generation',
        'Collaboration features',
        'Priority support',
      ],
    },
  ]
  
  export default function Pricing() {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-medium text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that works best for you
            </p>
          </div>
  
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col relative p-8 rounded-[20px] bg-[#003738]"
              >
                {/* Plan Name */}
                <h3 className="text-primary text-xl mb-4">
                  {plan.name}
                </h3>
  
                {/* Price */}
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-medium text-foreground">
                    ${plan.price}
                  </span>
                  <span className="ml-2 text-muted-foreground">
                    /{plan.period}
                  </span>
                </div>
  
                {/* Features List */}
                <div className="flex-grow space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-primary/60 shrink-0 mr-3" />
                      <span className="text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
  
                {/* CTA Button */}
                <Button 
                  className={
                    plan.name === 'Pro' 
                      ? 'w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12'
                      : 'w-full bg-[#004D4E] text-foreground hover:bg-[#004D4E]/90 rounded-full h-12'
                  }
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }