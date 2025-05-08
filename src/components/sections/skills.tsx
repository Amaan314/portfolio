import { skillsData, type Skill } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SkillsSection() {
  const categories = Array.from(new Set(skillsData.map(skill => skill.category)));

  return (
    <section id="skills" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          My Skillset
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillsData
                    .filter((skill) => skill.category === category)
                    .map((skill: Skill) => (
                      <Badge
                        key={skill.name}
                        variant="secondary"
                        className="flex items-center gap-2 p-2 text-sm transition-transform hover:scale-105 cursor-default"
                      >
                        <skill.icon className="h-4 w-4 text-primary" />
                        {skill.name}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
