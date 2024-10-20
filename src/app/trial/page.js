'use client'

import React, { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Loader2, Link, Shuffle } from "lucide-react"
import './src/app/globals.css'

const COLORS = ["#A07CEC", "#FFA500", "#FFFFFF"]

export default function YouTubeSentimentAnalysis() {
  const [youtubeLink, setYoutubeLink] = useState("")
  const [sentimentData, setSentimentData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const randomLinks = [
    "https://www.youtube.com/watch?v=DY5Z-uZ6ZMc&ab_channel=YCombinator",
    "https://www.youtube.com/watch?v=5Xa8IhSIiyY&ab_channel=VENUX"
  ]

  const setRandomLink = () => {
    const randomIndex = Math.floor(Math.random() * randomLinks.length)
    setYoutubeLink(randomLinks[randomIndex])
  }

  const analyzeSentiment = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSentimentData(null)

    try {
      const response = await fetch('http://127.0.0.1:5000/analyze_comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_url: youtubeLink }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      const sentimentResults = [
        { name: "Positive", value: data.positive_percentage },
        { name: "Negative", value: data.negative_percentage },
        { name: "Neutral", value: 100 - (data.positive_percentage + data.negative_percentage) },
      ]

      setSentimentData(sentimentResults)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-900 border-purple-500">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-purple-400">YouTube Sentiment Analysis</CardTitle>
          <CardDescription className="text-center text-gray-300">
            <br />
            <span className="text-sm text-gray-400">* Videos with more than 10,000 comments can take more time.</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={analyzeSentiment} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="url"
                placeholder="Enter YouTube URL"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                required
                className="flex-grow bg-gray-800 text-white border-purple-500 focus:border-orange-500"
              />
              <Button type="button" onClick={setRandomLink} variant="outline" className="bg-gray-800 text-white border-purple-500 hover:bg-purple-700">
                <Shuffle className="w-4 h-4 mr-2" />
                Random
              </Button>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Link className="mr-2 h-4 w-4" />
                  Analyze Sentiment
                </>
              )}
            </Button>
          </form>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          {sentimentData && (
            <div className="mt-8">
              <h3 className="text-3xl font-semibold text-center mb-4 text-orange-400">Sentiment Analysis Results</h3>
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
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="45%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
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
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {sentimentData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-white">{entry.name}: {entry.value.toFixed(2)}%</span>
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
