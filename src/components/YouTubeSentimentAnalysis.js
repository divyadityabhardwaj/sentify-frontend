"use client"

import React, { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

function YouTubeSentimentAnalysis() {
  const [youtubeLink, setYoutubeLink] = useState("")
  const [sentimentData, setSentimentData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const analyzeSentiment = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulating API call and processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock sentiment data (replace this with actual API call in a real application)
    const mockData = [
      { name: "Positive", value: Math.floor(Math.random() * 60) + 20 },
      { name: "Negative", value: Math.floor(Math.random() * 30) + 10 },
      { name: "Neutral", value: Math.floor(Math.random() * 40) + 10 },
    ]

    setSentimentData(mockData)
    setIsLoading(false)
  }

  const COLORS = ["#4ade80", "#f87171", "#60a5fa"]

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">YouTube Sentiment Analysis</CardTitle>
          <CardDescription className="text-center">
            Enter a YouTube link to analyze the video's sentiment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={analyzeSentiment} className="space-y-4">
            <Input
              type="url"
              placeholder="Enter YouTube URL"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Analyze Sentiment"}
            </Button>
          </form>

          {sentimentData && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center mb-4">Sentiment Analysis Results</h3>
              <ChartContainer
                config={{
                  positive: {
                    label: "Positive",
                    color: COLORS[0],
                  },
                  negative: {
                    label: "Negative",
                    color: COLORS[1],
                  },
                  neutral: {
                    label: "Neutral",
                    color: COLORS[2],
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {sentimentData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span>{entry.name}: {entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default YouTubeSentimentAnalysis