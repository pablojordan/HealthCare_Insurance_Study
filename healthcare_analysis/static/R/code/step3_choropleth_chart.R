#library(plotly)
#library(htmltools)

# give state boundaries a white border
l <- list(color = toRGB("white"), width = 2)

# specify some map projection/options
g <- list(
  scope = 'usa',
  projection = list(type = 'albers usa'),
  showlakes = TRUE,
  lakecolor = toRGB('white')
)

data$hover_uninsure <- with(data, paste(data$State,"<br>",
                                        "Rate 2010:", data$`Uninsured Rate (2010)`,"<br>",
                                        "Rate 2015:",data$`Uninsured Rate (2015)`))
data$hover_medica <- with(data, paste(data$State,"<br>",
                                      "Rate 2013:", data$`Medicaid Enrollment (2013)`,"<br>",
                                      "Rate 2016:",data$`Medicaid Enrollment (2016)`,"<br>",
                                      "Rate Change (2013-2016)", data$`Medicaid Enrollment Rate Change (2013-2016)`))

#write.csv(data,"plot_data.csv")

choro_uninsure <- plot_geo(data, locationmode = 'USA-states') %>%
  add_trace(z= ~`Uninsured Rate Change (2010-2015)`,text = ~hover_uninsure,locations = ~Abbreviation,
            color = ~`Uninsured Rate Change (2010-2015)`, colors =rev(RColorBrewer::brewer.pal(7,'Blues'))
  ) %>%
  colorbar(title = "Rate Change") %>%
  layout(
    title = 'Uninsured Rate Change (2010-2015)<br>(Hover for breakdown)',
    geo = g
  )


choro_medicare <- plot_geo(data, locationmode = 'USA-states') %>%
  add_trace(z= ~`Medicaid Enrollment Rate Change (2013-2016)`,text = ~hover_uninsure,locations = ~Abbreviation,
            color = ~`Medicaid Enrollment Rate Change (2013-2016)`, colors =RColorBrewer::brewer.pal(7,'Reds')
  ) %>%
  colorbar(title = "Rate Change") %>%
  layout(
    title = 'Medicaid Enrollment Rate Change (2013-2016)<br>(Hover for breakdown)',
    geo = g
  )




subplot(choro_uninsure,choro_medicare,grap1,nrows=3)

