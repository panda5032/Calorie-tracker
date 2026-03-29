import SwiftUI
import SwiftData

struct ProfileView: View {
    @Environment(\.modelContext) private var modelContext
    @State private var viewModel = ProfileViewModel()

    var body: some View {
        NavigationStack {
            Form {
                if let profile = viewModel.profile {
                    Section("Personal Info") {
                        HStack {
                            Text("Weight")
                            Spacer()
                            TextField("lbs", value: Bindable(profile).weightLbs, format: .number)
                                .keyboardType(.decimalPad)
                                .multilineTextAlignment(.trailing)
                                .frame(width: 80)
                            Text("lbs")
                                .foregroundStyle(.secondary)
                        }

                        HStack {
                            Text("Height")
                            Spacer()
                            TextField("inches", value: Bindable(profile).heightInches, format: .number)
                                .keyboardType(.decimalPad)
                                .multilineTextAlignment(.trailing)
                                .frame(width: 80)
                            Text("in (\(profile.heightInches.feetAndInchesString))")
                                .foregroundStyle(.secondary)
                        }

                        HStack {
                            Text("Age")
                            Spacer()
                            TextField("years", value: Bindable(profile).age, format: .number)
                                .keyboardType(.numberPad)
                                .multilineTextAlignment(.trailing)
                                .frame(width: 80)
                            Text("years")
                                .foregroundStyle(.secondary)
                        }

                        Picker("Sex", selection: Bindable(profile).sex) {
                            ForEach(Sex.allCases, id: \.self) { sex in
                                Text(sex.rawValue).tag(sex)
                            }
                        }

                        Picker("Activity Level", selection: Bindable(profile).activityLevel) {
                            ForEach(ActivityLevel.allCases, id: \.self) { level in
                                Text(level.rawValue).tag(level)
                            }
                        }
                    }

                    Section("Goal") {
                        HStack {
                            Text("Goal Weight")
                            Spacer()
                            TextField("lbs", value: Bindable(profile).goalWeightLbs, format: .number)
                                .keyboardType(.decimalPad)
                                .multilineTextAlignment(.trailing)
                                .frame(width: 80)
                            Text("lbs")
                                .foregroundStyle(.secondary)
                        }

                        DatePicker(
                            "Goal Date",
                            selection: Bindable(profile).goalDate,
                            displayedComponents: .date
                        )

                        HStack {
                            Text("Weekly Loss Rate")
                            Spacer()
                            Text(String(format: "%.1f lbs/week", viewModel.weeklyLossRate))
                                .foregroundStyle(.secondary)
                        }
                    }

                    Section("Calculated Values") {
                        HStack {
                            Text("BMR")
                            Spacer()
                            Text(viewModel.bmr.calorieFormatted)
                                .foregroundStyle(.secondary)
                        }
                        HStack {
                            Text("TDEE")
                            Spacer()
                            Text(viewModel.tdee.calorieFormatted)
                                .foregroundStyle(.secondary)
                        }
                        HStack {
                            Text("Daily Calorie Target")
                            Spacer()
                            Text(viewModel.dailyTarget.calorieFormatted)
                                .foregroundStyle(AppColors.accent)
                                .fontWeight(.semibold)
                        }
                    }

                    Section {
                        GoalProgressView(
                            currentWeight: profile.weightLbs,
                            goalWeight: profile.goalWeightLbs,
                            startWeight: 215, // Initial starting weight
                            daysRemaining: viewModel.daysRemaining
                        )
                        .listRowInsets(EdgeInsets())
                        .listRowBackground(Color.clear)
                    }

                    Section {
                        Button("Save Changes") {
                            viewModel.saveProfile(context: modelContext)
                        }
                        .frame(maxWidth: .infinity)
                        .fontWeight(.semibold)
                        .foregroundStyle(AppColors.accent)
                    }
                }
            }
            .navigationTitle("Profile")
            .onAppear { viewModel.loadProfile(context: modelContext) }
            .onChange(of: viewModel.profile?.activityLevel) { _, _ in
                viewModel.recalculate()
            }
            .onChange(of: viewModel.profile?.sex) { _, _ in
                viewModel.recalculate()
            }
        }
    }
}
