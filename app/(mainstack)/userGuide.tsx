import Icon from "@/src/assets/Icons";
import HomeHeader from "@/src/components/HomeHeader";
import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const refrenceData = [
  ` 1) Fermon Tate Jr. - Head Coach at Lawrence Technological University \n https://ltuathletics.com/sports/mens-track-and-field/roster/coaches/fermon-tate-jr-/1`,
  ` 2) MVSU Sports Profile \n https://mvsusports.com/sports/womens-track-and-field/roster/coaches/fermon-tate-jr-/195`,
  ` 3) Coach Tate Jr. Oﬃcial Website \n https://coachtatejr.com/`,
  ` 4) Book: So You Want to Be a College Scholar Athlete, Second Edition \n https://www.amazon.com/Want-College-Scholar-Athlete-Second/dp/B0DJGDFP5W`,
];

export default function UserGuide() {
    const rightIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.settingsContainer}
      >
        <Icon
          family="AntDesign"
          name="left"
          size={18}
          color={Colors.placeHolder}
        />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#000000", "#000000"]}
      start={{ x: 0, y: 0.2 }}
      end={{ x: 2, y: 0.1 }}
    >
      <HomeHeader heading="User Guide" rightIcon={rightIcon()} />
      <View 
       style={{
                flex: 1,
                backgroundColor: Colors.inputBackground,
                borderTopLeftRadius: scale(20),
                borderTopRightRadius: scale(20),
                marginTop: scale(40),
                paddingBottom:scale(30),paddingTop:scale(20)
              }}
      >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>
            There are five different kinds of tables
          </Text>
          <Text style={styles.content}>
            In the prompt of this app. Each one is used in order to develop one
            or more workouts customized to the runner's own personal level of
            ability. The different tables are: {"\n"} 1) Scoring tables {"\n"}{" "}
            2) Pacing tables for interval running {"\n"} 3) Intermediate "split"
            tables{"\n"} 4) Reduced speed tables {"\n"} 5) Pacing tables for
            long distance running. {"\n"}
            {"\n"}The scoring table is designed to assign a numeric "point
            score" to an athlete's performance. For instance, if an athlete
            completes a 400m in 50.sec, their point score reflects a comparable
            level of ability across various events. This score serves as a
            universal benchmark, allowing for consistent performance
            evaluation.The scoring tables in this app assist you in identifying
            your relative skill level. To begin, you’ll assign point scores to
            each of your runners based on their recent performances in standard
            events. Once you have these point scores, you can utilize the other
            tables to provide your athletes with tailored workout times that
            suit their abilities.{"\n"}
          </Text>
          <Text style={styles.heading}>Components of the System</Text>
          <Text style={styles.heading}>
            1) Calculating Your Runner’s Point Score
          </Text>
          <Text style={styles.content}>
            To effectively design interval training workouts on the track or
            long-distance sessions on the road, it’s essential to understand
            each runner’s performance levels. The foundation of this process
            involves selecting a standard race or time trial for each runner,
            referencing the scoring tables to find their point score, and using
            that score as a benchmark for shaping future workouts. For example,
            consider a runner who has completed a 5000 meters in 14:30
            (averaging 4:38 per mile). This performance corresponds to a point
            score of 762. With that score in hand, you can estimate what the
            runner might achieve in other distances, such as the mile or 10K. In
            the 10K scoring table, 762 points align with a projected time of
            30:45 (or 4:56 per mile). Conversely, in the mile scoring table, 762
            points suggest a time of 4:17. However, it's crucial to note that if
            a runner hasn’t focused on long-distance training, they may not
            realistically achieve their marathon performance at the same 762
            point level (which would be around 2:29:00).Every runner has a
            distinct set of point scores that span various race distances. It’s
            vital to remember that the point score serves as a guideline. On any
            given day, a runner might exceed their typical score during a race
            or time trial, or they might perform exceptionally well in a workout
            that doesn’t necessarily translate into race performance.
            Nevertheless, if a runner consistently achieves a specific point
            score during workouts, it indicates a strong likelihood that they
            can reach a similar performance in an actual race or time trial.In
            summary, use the point score as a helpful reference for your
            runners, keeping in mind that individual training backgrounds and
            race experiences will influence their performance across different
            distances.
          </Text>
          <Text style={styles.heading}>
            2) Utilizing the Pacing Tables for Interval Training
          </Text>

          <Text style={styles.content}>
            First, observe that the initial row of the table is labeled "100%."
            This signifies the peak speed for the 400-point level. For the mile,
            this translates to a time of 6:24 (compared to the 6:10 at the 412
            level). The 450-point pacing table indicates a time of 5:58, which
            is marginally quicker than the 6:10 achieved in practice. Therefore,
            initiating from the 400-point level pacing table is reasonable, as
            your runner is likely to complete the prescribed workouts
            comfortably or even at a slightly swifter pace than indicated.The
            fundamental workout is derived directly from the tables: have your
            runner select an entry and execute the workout as prescribed. For
            example, at the 400-point level, there are numerous equivalent
            workouts available. The table features 150 different workouts for
            each point level, but in reality, there are countless combinations
            since you can mix and match across the app. As the coach, your focus
            should be on the specific workout you want each category of runner
            to undertake. Each individual then performs their workout based on
            the times designated for their respective point level. Consequently,
            for a specific workout, each runner in the group will have a unique
            time to aim for. For instance, if you have five runners on your
            team, and you want them to complete 12 x 500m intervals, you would
            consult the pacing table to find the closest 500m time for each
            runner’s ability. A runner at the 700-point level would complete
            each interval in 1:25, while a 400-point runner would target 2:05.
            Keep in mind that the pacing tables can also serve as a predictor of
            your runner’s future performance in races or time trials. As a
            runner enhances their training, they’ll likely execute the intervals
            at a pace corresponding to a higher point level in the tables. This
            offers insight into the runner’s potential performance at that
            elevated level during a race. For example, if a runner at the
            412-point level consistently performs intervals at the 480-point
            level, they are anticipated to improve their race performance to
            match that level, potentially reducing their 5000 meters time from
            20:30 to approximately 18:45.Before proceeding, it’s essential to
            consider that some runners excel during workouts while others shine
            in competitions. If you notice this discrepancy, take it into
            account. You might find that the runner performs intervals at a
            higher point level in practice than in actual races. The coach
            should consider this when translating workouts to racing
            scenarios.It’s crucial to align your runner’s ability with the
            appropriate pacing tables for interval training. For instance, a
            sprinter shouldn’t attempt to do repeated mile intervals, nor should
            a distance runner frequently engage in high repetitions of 200m
            sprints. Therefore, use the tables wisely. With thousands of
            applications available, selecting the right method will enhance your
            runner’s performance, making the tables an invaluable resource in
            your coaching toolkit.
          </Text>

          <Text style={styles.heading}>
            3) Using the Intermediate "Split" Tables
          </Text>
          <Text style={styles.content}>
            The Intermediate "Split" Tables are valuable tools for calculating
            the time required to run a non-standard distance when you know the
            400m pace. A sample of an intermediate "split" table can be found in
            the app. For instance, let’s say you want someone to run 200 meters
            at a pace of 22.5 for each 200m. While you could calculate this with
            a calculator, it’s much easier to use the table. Referring to the
            sample table, you can see that the 200m time for a 22.5 200m pace is
            46.9 seconds. These tables simplify the process of determining times
            for intermediate distances based on a specified 400m pace. Another
            practical application of these tables is to easily ascertain the
            400m pace for a non-standard distance. For example, if someone
            completes 250m in 54.0 seconds, you can determine that they are
            running at a 1:30 400m pace.
          </Text>
          <Text style={styles.heading}>4) Using the Reduced Speed Tables</Text>
          <Text style={styles.content}>
            When you want your runners to train by covering longer distances,
            it’s essential to have them slow down and run at a more manageable
            pace. You can often estimate how much to decelerate based on a
            percentage of their maximum speed. This means you’ll want to
            determine the pace per mile or per kilometer for that reduced speed
            percentage. Alternatively, you might be interested in identifying a
            specific slower pace as a percentage of their full speed. The
            Reduced Speed Tables were created to aid in these scenarios. There
            are both "Per Mile" and "Per Kilometer" tables since some runners
            prefer thinking in terms of mile pace while others favor kilometer
            pace. A sample of the Reduced Speed Table in the "Per Mile" format
            can be found on the Al app . Just asks AI per-mile or per-kilometer
            pace, ask AI a list of percentages from 90% down to 65%,
            representing the percent of velocity for the given pace. For
            instance, if your runners were clocking a 5:30 per mile pace and
            decided to slow down to 80% of that velocity, they would be running
            at a 6:52 per mile pace. Similarly, if they maintained a 6:52 per
            mile pace for a longer run, it would indicate that they were
            operating at 80% of their 5:30 per mile pace.These tables are
            frequently used alongside the Pacing Tables for Long Distance
            Running, allowing you to determine the appropriate pace for a long
            run effectively.
          </Text>
          <Text style={styles.heading}>
            5) Using the Pacing Tables for Long Distance Running
          </Text>
          <Text style={styles.content}>
            When your runners are engaged in long-distance training, it’s
            important to determine the total time they should run for a given
            distance based on the goal pace you set. Alternatively, you might
            know the total time they ran for a specific distance and want to
            easily calculate the pace for that run. The Pacing Tables for Long
            Distance Running provide a straightforward method to compute the
            pace and/or total time. A sample of a Pacing Table for Long Distance
            Running is available in the app. On the left side, you’ll find the
            per-mile or per-kilometer pace, and to the right, several distances
            with the total time displayed if the runner maintains that pace
            throughout. For example, at a 5:45 mile pace, the time for a 10K
            would be 36:00. If a runner completes a half-marathon in 1:18:45,
            their per-mile pace would be easily calculated as 6:00 per mile.
            These per-mile and per-kilometer tables are invaluable for planning
            long-distance training runs since pace is a critical factor. When
            deciding how far your runners should go for a longer, slower
            distance, a good rule of thumb is to have them run between 50%
            further than their typical or average distance at about 85-87.5%
            speed, up to 100% further at around 75-77.5% speed. For instance, if
            a runner can complete four miles at a 7:30 per mile pace (30:00
            total), you would suggest they run at around 8:45 per mile for a
            6-mile run (50% longer) and at approximately 9:50 per mile for an
            8-mile run (100% longer). This serves as a general guideline;
            advanced runners may maintain a slightly higher percentage of speed,
            while less experienced runners might run at a marginally lower pace.
          </Text>
          {/* {refrenceData.map((item, index) => {
            return (
              <Text key={index} style={styles.content}>
                {item} {"\n"}
              </Text>
            );
          })} */}
        </View>
      </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: Colors.white,
  },
  inputContainer: {
    marginTop: scale(100),
    paddingHorizontal: scale(20),
  },
  settingsContainer: {
    backgroundColor: Colors.inputBackground,
    padding: scale(10),
    borderRadius: scale(8),
  },
  labelStyle: {
    marginVertical: verticalScale(5),
    fontSize: scale(14),
  },
  inputStyle: {
    fontSize: scale(11),
    height: verticalScale(35),
    paddingLeft: scale(5),
  },
  sectionStyle: {
    paddingVertical: 0,
    paddingRight: scale(6),
  },
  contentContainer: {
    paddingHorizontal: scale(18),
    marginBottom: scale(100),
  },
  heading: {
    fontFamily: FONTS.bold,
    fontWeight: "bold",
    marginVertical: 5,
    fontSize: scale(16),
    color: '#C2C2C2',
  },
  content: {
    marginVertical: 5,
    fontSize: scale(12),
    lineHeight: scale(18),
    fontFamily: FONTS.regular,
    color: Colors.placeHolder,
  },
});
